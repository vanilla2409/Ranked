import prisma from "../exports/prisma";

export async function createNewUser(username, email, hashedPassword, verificationToken) {
  return await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: hashedPassword,
      emailVerificationToken: verificationToken,
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