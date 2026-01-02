import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Section,
} from "@react-email/components";

interface EmailVerificationProps {
  username: string;
  verifyUrl: string;
  appName: string;
}

export const EmailVerification = ({
  username,
  verifyUrl,
  appName,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            Welcome to {appName}, {username}!
          </Heading>

          <Text style={styles.text}>
            Please verify your email address by clicking the button below.
          </Text>

          <Section style={styles.buttonContainer}>
            <Button style={styles.button} href={verifyUrl}>
              Verify Email
            </Button>
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
  buttonContainer: {
    textAlign: "center" as const,
    margin: "30px 0",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "12px 24px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "inline-block",
  },
  footerText: {
    fontSize: "14px",
    color: "#999",
    marginTop: "40px",
  },
};

export default EmailVerification;
