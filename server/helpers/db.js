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
    return user;
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

// this function will return the number of total matches played, and number of matches won by a user
export async function getMatchesPlayedAndWon(username) {
  // Get the user's ID from username first
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) throw new Error("User not found");

  const matchesPlayed = await prisma.match.count({
    where: {
      participants: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  const matchesWon = await prisma.match.count({
    where: {
      winnerId: user.id,
    },
  });

  return {
    matchesPlayed,
    matchesWon,
  };
}


