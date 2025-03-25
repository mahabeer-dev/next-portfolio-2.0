import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

export default function ThankYouEmail({
  customerName,
}: {
  customerName: string;
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
            Thank You for Contacting Us!
          </Heading>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            Dear {customerName},
          </Text>
          <Text style={{ color: "#555555", fontSize: "16px" }}>
            We appreciate you reaching out to us. Our team has received your
            message and will get back to you as soon as possible.
          </Text>

          <Text
            style={{ color: "#777777", fontSize: "12px", marginTop: "20px" }}
          >
            Best Regards, <br />
            Mahabeer
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
