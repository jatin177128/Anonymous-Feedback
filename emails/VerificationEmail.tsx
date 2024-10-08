import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from "@react-email/components";
interface VerificationEmailProps{
    username: string;
    otp : string;
}

export default function VerificationEmail({username, otp}: VerificationEmailProps){
    return(
        <Html lang="en" dir= "ltr">
            <Head>
                <title>Verifcation Code</title>
            </Head>
            <Preview>Here&apos;s your verification code:{otp}</Preview>
            <Section>
                <Row>
                    <Heading as = "h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thankyou for registering .Please use this following verification code to compelete your registeration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code ,please ignore this email. 
                    </Text>
                </Row>
            </Section>

        </Html>
        
    );
}

