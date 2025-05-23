"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import style from "./loginpage.module.css";
import Typed from "typed.js";
import { useRouter } from "next/navigation";
import { loginHandler } from "../server/auth/auth";
import { toast } from "react-toastify";
import Link from "next/link";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
type ValidationError = {
  location: "body" | "query" | "params" | "headers"; // Common locations for validation
  msg: string; // Error message
  path: string; // The field that caused the error
  type: "field" | "other"; // Type of error
  value?: string; // The invalid value (optional)
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const el = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Login or Signup"],
      typeSpeed: 100,
      loop: true,
      loopCount: Infinity,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "🖊",
      autoInsertCss: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // const router = useRouter();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginHandler({ email, password })
      .then((data) => {
        toast.success("Login Successfull...");
        localStorage.setItem("kanchan-token", data.token);
        localStorage.setItem("kanchan-user", JSON.stringify(data.user));
        router.push("/service");
      })
      .catch((err) => {
        const errorArray = err.response.data.message;
        if (Array.isArray(errorArray)) {
          errorArray[0].length > 0 &&
            errorArray[0].forEach((error: ValidationError) => {
              toast.error(`sign up failed ${error.msg}`);
            });
        } else {
          toast.error(errorArray);
        }
      });
  };

  return (
    <>
      <HeaderOne headerTop={true} />
      <ThemeProvider theme={darkTheme}>
        <Box className={`${style.lsContainer}`}>
          <Paper
            elevation={5}
            className="p-8 w-96 rounded-lg shadow-lg"
            sx={{ padding: "20px 0px" }}
          >
            <span className={`${style.lspara}`} ref={el} />
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  margin: "20px 10%",
                  width: "80%",
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  margin: "20px 10%",
                  width: "80%",
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  margin: "20px 20%",
                  width: "60%",
                }}
              >
                Login
              </Button>
            </form>
            <div className="text-center">
              <p>
                Need help?{" "}
                <Link
                  style={{
                    color: "#ffe000",
                  }}
                  href="/forget-password"
                >
                  forget password here
                </Link>
              </p>
            </div>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Dont have a account :{" "}
              <b
                style={{ color: "#ffe000", cursor: "pointer" }}
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Sign-Up
              </b>
            </p>
          </Paper>
        </Box>
      </ThemeProvider>
      <FooterOne />
    </>
  );
};

export default LoginPage;
