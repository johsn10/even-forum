import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET() {
   const response = await supabase.from("Post").select("*");
   return Response.json(response.data);
}

export async function POST(request) {
    const json = await request.json();
    const heading = json.heading;
    const content = json.content;

    const { statusText } = await supabase.from("Post")
        .insert({ heading: heading, content: content });

    return Response.json({ status: statusText }); 
}