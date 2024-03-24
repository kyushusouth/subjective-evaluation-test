import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateRandomString(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}

async function main() {
    const numRespondents = 30;
    for (let i = 0; i < numRespondents; i++) {
        await prisma.respondents.create({
            data: {
                name: generateRandomString(8),
                password: generateRandomString(8),
                sex: "",
                age: -1,
            },
        })
    }
}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
