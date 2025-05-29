import prisma from "../exports/prisma.js";

export async function createNewUser(username, email, hashedPassword, verificationToken) {
  return await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: hashedPassword,
      emailVerificationToken: verificationToken,
      registrationType: 'EMAIL'
    },
  });
}

export async function findUserByUsernameOrEmail(username, email) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        { email: email },
      ],
    },
  });

  if(user){
    return true
  }
    return false;
}

export async function checkUserAuthentication(username, email, password) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        { email: email },
      ],
      AND: {
        passwordHash: password,
      },
        },
      });
    
      if(user) {
        return user;
      }
  return false;
}

export async function addNewMatch(winnerUsername, opponentUsername, matchId, problemId, date) {
  const users = await prisma.user.findMany({
    where: {
      username: { in: [winnerUsername, opponentUsername] },
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (users.length !== 2) {
    throw new Error("One or both usernames not found");
  }

  const userMap = Object.fromEntries(users.map(user => [user.username, user.id]));

  return await prisma.match.create({
    data: {
      id: matchId,
      winner: { connect: { id: userMap[winnerUsername] } },
      problem: { connect: { id: problemId } },
      playedAt: date,
      participants: {
        create: [
          { user: { connect: { id: userMap[winnerUsername] } } },
          { user: { connect: { id: userMap[opponentUsername] } } },
        ],
      },
    },
  });
}

