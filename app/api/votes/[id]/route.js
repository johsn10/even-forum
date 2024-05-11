import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(request, { params }) {
    var upvotes = 0;
    var downvotes = 0;
    
    const upvotesResponse = await supabase.from("Vote")
        .select("*")
        .eq("post_id", params.id)
        .eq("is_upvote", "True");
    
    const downvotesResponse = await supabase.from("Vote")
        .select("*")
        .eq("post_id", params.id)
        .eq("is_upvote", "False");
    
    if (upvotesResponse.data.length != 0) {
        upvotes = upvotesResponse.data.length;
    }
    
    if (downvotesResponse.data.length != 0) {
        downvotes = downvotesResponse.data.length;
    }
    const voteScore = upvotes - downvotes;

    return Response.json({ voteScore: voteScore } );
}

export async function POST(request, { params }) {
    const requestJson = await request.json();
    
    const result = await supabase.from("Vote")
    .insert({ post_id: params.id, is_upvote: requestJson.isUpvote });

    return Response.json( {result: result} );
}