import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

export default function AdminQueryNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return (
    <Html lang="en">
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f6f6f6",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Heading
            style={{ color: "#333333", fontSize: "24px", textAlign: "center" }}
          >
            New Query Received
          </Heading>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            Dear Admin,
          </Text>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            A new query has been submitted with the following details:
          </Text>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            <strong>Subject:</strong> {subject}
          </Text>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            <strong>Message:</strong> {message}
          </Text>

          <Text
            style={{ color: "#777777", fontSize: "12px", marginTop: "20px" }}
          >
            Best Regards, <br />
            Your Support Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
