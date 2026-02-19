type HandlerEvent = {
  httpMethod: string;
  body: string | null;
};

type HandlerResponse = {
  statusCode: number;
  body: string;
};

type GrokResponse = {
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

  const apiKey = process.env['GROK_API_KEY'];
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing GROK_API_KEY' })
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
    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-2-latest',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      })
    });

    const data = (await grokResponse.json()) as GrokResponse;

    if (!grokResponse.ok) {
      return {
        statusCode: grokResponse.status,
        body: JSON.stringify({ error: data.error?.message || 'Grok API error' })
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
      body: JSON.stringify({ error: 'Unable to connect to Grok API' })
    };
  }
};
