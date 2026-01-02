import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Section,
} from "@react-email/components";

interface OTPVerificationProps {
  username: string;
  verifyUrl: string;
  appName: string;
  otp: string;
}

export const OTPVerification = ({
  username,
  verifyUrl,
  appName,
  otp,
}: OTPVerificationProps) => {
  return (
    <Html>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            Welcome to {appName}, {username}!
          </Heading>

          <Text style={styles.text}>
            Please verify your email address using the code below:
          </Text>

          <Section style={styles.otpContainer}>
            <Text style={styles.otpCode}>{otp}</Text>
          </Section>

          <Text style={styles.footerText}>
            If you didn't request this, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 20px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  otpContainer: {
    textAlign: "center" as const,
    margin: "30px 0",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  otpCode: {
    fontSize: "32px",
    fontWeight: "bold",
    letterSpacing: "8px",
    color: "#2563eb",
    margin: "0",
  },
  footerText: {
    fontSize: "14px",
    color: "#999",
    marginTop: "40px",
  },
};

export default OTPVerification;
