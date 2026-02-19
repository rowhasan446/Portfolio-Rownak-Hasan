import { profileData } from "@/data/profileData";

export async function POST(req) {
    try {
        const { message } = await req.json();
        const query = (message || "").toLowerCase();

        // Keyword matching logic
        let response = "";

        if (query.includes("skill")) {
            response = `Rownak has a strong foundation in modern web technologies. His core skills include ${profileData.skills.slice(0, -1).join(", ")} and ${profileData.skills.slice(-1)}. He's particularly passionate about building full-stack applications with Next.js and React.`;
        }
        else if (query.includes("education") || query.includes("study") || query.includes("university") || query.includes("cse")) {
            const edu = profileData.education[0];
            response = `Currently, Rownak is pursuing a ${edu.degree} at ${edu.institution}. He's focusing on building innovative web solutions and honing his full-stack development skills.`;
        }
        else if (query.includes("project")) {
            const projects = profileData.projects.map(p => {
                let projectInfo = `• **${p.title}**\n${p.description}\n*Tech:* ${p.tech.join(", ")}`;
                if (p.links.demo) projectInfo += `\n[Live Demo](${p.links.demo})`;
                if (p.links.github) projectInfo += ` | [GitHub](${p.links.github})`;
                return projectInfo;
            }).join("\n\n");
            response = `Rownak has worked on some exciting projects! Here are the details:\n\n${projects}\n\nIs there any specific project you'd like to know more about?`;
        }
        else if (query.includes("experience") || query.includes("work")) {
            const experience = profileData.experience.map(e => `• **${e.role}** at **${e.company}** (${e.period})\n  ${e.description.join(" ")}`).join("\n\n");
            response = `Rownak has gained valuable experience across several roles:\n\n${experience}\n\nHe has a proven track record of collaborating with teams and delivering quality results.`;
        }
        else if (query.includes("contact") || query.includes("github") || query.includes("location") || query.includes("reach")) {
            response = `You can easily reach out to Rownak! He is based in ${profileData.contact.location}. You can check out his work on [GitHub](${profileData.contact.github}) or connect with him to discuss potential opportunities.`;
        }
        else if (query.includes("who") || query.includes("about") || query.includes("rownak") || query.includes("hi") || query.includes("hello")) {
            response = `Hello! I'm Rownak Hasan's personal AI assistant. Rownak is a ${profileData.role} who loves creating seamless digital experiences. Whether you're interested in his technical skills, his portfolio of projects, or his professional journey, I'm here to help you get to know him better!`;
        }
        else {
            response = "I'm sorry, I don't have information on that specific topic yet. However, I can definitely tell you all about Rownak's skills, professional experience, education, or the various projects he's built. What would you like to explore?";
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
