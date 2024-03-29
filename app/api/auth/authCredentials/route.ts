import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const res = await request.json();

    const respondent = await prisma.respondents.findUnique({
        where: {
            name: res.name,
        }
    })

    if (respondent && res.password === respondent.password) {
		const { password, ...respondentData } = respondent;
		const responseData = {
			ok: true,
			data: respondentData,
		}
		return new Response(JSON.stringify(responseData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		})
	} else {
		const responseData = {
			ok: false,
			data: null,
		}
		return new Response(JSON.stringify(responseData), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}