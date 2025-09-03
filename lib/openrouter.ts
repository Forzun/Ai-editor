
export async function fetchFromOpneRouter(text: string){

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3.1:free",
          messages: [
            {
              role: "user", 
              content: text,
            }
          ]
        })
      });


    if(!response.ok){ 
        throw new Error("faiiled to fetch from ai");
    }

    const data = await response.json();
    return data.choices[0].message.content;
}


