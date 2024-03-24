import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Index() {
  const users = await prisma.respondents.findMany()

  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.id}, {user.name}, {user.password}, {user.sex}, {user.age}
          </li>
        ))}
      </ul>
      <audio src="https://bqwgexbjtqydlqabfwdy.supabase.co/storage/v1/object/public/wav/abs.wav" controls controlslist="nodownload"></audio>
      <audio src="https://bqwgexbjtqydlqabfwdy.supabase.co/storage/v1/object/public/wav/generate.wav" controls controlslist="nodownload"></audio>
      <audio src="https://bqwgexbjtqydlqabfwdy.supabase.co/storage/v1/object/public/wav/gt.wav" controls controlslist="nodownload"></audio>
    </div>
  )
}
