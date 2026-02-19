import { profileData } from "@/data/profileData";

export async function POST(req) {
    try {
        const { message } = await req.json();
        const query = (message || "").toLowerCase();

        // Keyword matching logic
        let response = "";

        if (query.includes("skill")) {
            response = `Rownak's skills include: ${profileData.skills.join(", ")}.`;
        }
        else if (query.includes("education") || query.includes("study") || query.includes("university")) {
            const edu = profileData.education[0];
            response = `Rownak is studying ${edu.degree} at ${edu.institution}.`;
        }
        else if (query.includes("project")) {
            const projectNames = profileData.projects.map(p => p.title).join(", ");
            response = `Rownak has built several projects including: ${projectNames}.`;
        }
        else if (query.includes("experience") || query.includes("work")) {
            const roles = profileData.experience.map(e => `${e.role} at ${e.company}`).join(", ");
            response = `Rownak's experience includes: ${roles}.`;
        }
        else if (query.includes("contact") || query.includes("github") || query.includes("location")) {
            response = `Rownak is based in ${profileData.contact.location}. You can find him on GitHub: ${profileData.contact.github}`;
        }
        else if (query.includes("who") || query.includes("about") || query.includes("rownak")) {
            response = `Rownak Hasan is a ${profileData.role} currently studying CSE at North South University.`;
        }
        else {
            response = "Sorry, this chatbot only answers questions about Rownak's professional profile.";
        }

        return new Response(JSON.stringify({ response }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Local Chatbot Error:", error);
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
