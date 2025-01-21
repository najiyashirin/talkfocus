import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import type { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
        navigate("/profile");
      }
      if (event === "SIGNED_OUT") {
        setError("");
      }
      if (event === "USER_UPDATED") {
        const checkSession = async () => {
          const { error } = await supabase.auth.getSession();
          if (error) {
            setError(getErrorMessage(error));
          }
        };
        checkSession();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User not found":
        return "No user found with these credentials.";
      default:
        return error.message;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold">Welcome</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--primary))',
                  brandAccent: 'hsl(var(--primary))',
                }
              }
            },
            className: {
              container: 'space-y-4',
              button: 'w-full px-4 py-2 rounded-md',
              input: 'w-full px-3 py-2 border rounded-md',
              label: 'text-sm font-medium',
            }
          }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </div>
    </div>
  );
};

export default Auth;