import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  inviterName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth user
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Extract the JWT token from the Bearer header
    const token = authHeader.replace('Bearer ', '');

    const supabaseUrl = "https://hbwcwjutcgojftypzxdm.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhid2N3anV0Y2dvamZ0eXB6eGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTkyNTEsImV4cCI6MjA2ODIzNTI1MX0.1isSvWuMIhQsroLhwBT1qkV_Hsv1XVu4KX7rVxeoYys";
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { 
        autoRefreshToken: false,
        persistSession: false 
      },
      global: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const { email, inviterName }: InvitationRequest = await req.json();

    // Generate unique invitation code
    const invitationCode = crypto.randomUUID();
    
    // Save invitation to database
    const { error: dbError } = await supabase
      .from('friend_invitations')
      .insert({
        inviter_id: user.id,
        email: email.toLowerCase(),
        invitation_code: invitationCode,
        status: 'pending'
      });

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Create invitation link
    const invitationLink = `${supabaseUrl.replace('https://supabase.co', '.lovableproject.com')}/auth?invite=${invitationCode}`;
    
    // Send invitation email
    const emailResponse = await resend.emails.send({
      from: "My Anime Universe <invitations@resend.dev>",
      to: [email],
      subject: `${inviterName} te ha invitado a My Anime Universe!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">🎌 My Anime Universe</h1>
            <p style="color: #64748b; font-size: 16px;">Tu red social para amantes del anime</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0;">¡${inviterName} te ha invitado!</h2>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">Únete para conectar, compartir y descubrir animes juntos</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #1e293b; margin-top: 0;">¿Qué puedes hacer en My Anime Universe?</h3>
            <ul style="color: #475569; line-height: 1.6;">
              <li>📝 Crear tu lista personal de animes vistos y por ver</li>
              <li>⭐ Puntuar y reseñar tus animes favoritos</li>
              <li>👥 Conectar con amigos y comparar listas</li>
              <li>🎯 Recibir recomendaciones personalizadas</li>
              <li>🔍 Descubrir nuevos animes por género y tipo</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${invitationLink}" 
               style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
              🚀 Únete Ahora
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">
              Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
            </p>
            <p style="color: #64748b; font-size: 12px; word-break: break-all; margin: 10px 0;">
              ${invitationLink}
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0 0;">
              Esta invitación es válida por 7 días. Si no solicitaste esta invitación, puedes ignorar este email.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Invitation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Invitación enviada correctamente",
      invitationCode 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-invitation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);