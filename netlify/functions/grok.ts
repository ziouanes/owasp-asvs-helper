type HandlerEvent = {
  httpMethod: string;
  body: string | null;
};

type HandlerResponse = {
  statusCode: number;
  body: string;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const apiKey = process.env['GROQ_API_KEY'] || process.env['GROK_API_KEY'];
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing GROQ_API_KEY' })
    };
  }

  const body = event.body ? JSON.parse(event.body) : {};
  const prompt = body.prompt;

  if (!prompt || typeof prompt !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing prompt' })
    };
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      })
    });

    const data = (await groqResponse.json()) as GroqResponse;

    if (!groqResponse.ok) {
      return {
        statusCode: groqResponse.status,
        body: JSON.stringify({ error: data.error?.message || 'Groq API error' })
      };
    }

    const text = data.choices?.[0]?.message?.content || 'No response generated.';

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to connect to Groq API' })
    };
  }
};
