export function SendWaitlistEmailTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>

    <!-- Google Fonts Link for Space Grotesk -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Space Grotesk', sans-serif;
            margin: 0;
            padding: 50px 0;
            background-color: white;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        }

        .header {
            background-color: #1b1e56;
            padding: 20px;
            text-align: center;
        }

        .header img {
            width: 150px;
        }

        .content {
            padding: 40px;
            color: #333;
            background-image: url('https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727129656/background_zdqye1.png');
            background-size: cover;
            background-position: center;
            text-align: left;
        }

        .message-image {
            text-align: center;
            margin-bottom: 20px;
        }

        .message-image img {
            width: 150px;
        }

        .content span {
            color: #1b1e56;
            font-weight: 700;
            font-size: 30px;
            display: block;
            margin-bottom: 20px;
            text-align: center;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 15px;
        }

        .footer {
            background-color: #1b1e56;
            text-align: center;
        }

        .footer img {
            width: 100%;
            height: auto;
        }

        .btn {
            padding: 15px 25px;
            border-radius: 10px;
            border: solid 1.5px;
            background-color: #1b1e56;
            color: white;
            margin-top: 20px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 20px;
            font-weight: 500;
            cursor: pointer;
            text-align: center;
            display: inline-block;
            margin: 20px 0;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }

        .btn:hover {
            background-color: #1b1e88;
            color: #fff;
            transform: translateY(-2px);
        }

        /* Social media section styling */
        .social-media-container {
            text-align: center; /* Center-aligns the text and icons */
            margin-top: 30px;
        }

        .social-media-container p {
            margin-bottom: 10px; /* Adds space between text and icons */
        }

        .social-icons {
            display: flex;
            justify-content: space-between; /* Even spacing between icons */
            align-items: center;
            max-width: 200px; /* Ensure the icons container isn't too wide */
            margin: 0 auto; /* Center the container */
        }

        .social-icons a {
            margin: 0 auto;
        }

        .social-icons img {
            width: 24px;
            height: 24px;
        }

        /* Mobile layout fix */
        @media screen and (max-width: 480px) {
            .social-icons {
                justify-content: space-between; /* Keeps icons spaced on mobile */
                gap: 20px; /* Adds space between icons */
            }

            .social-icons img {
                width: 20px; /* Reduce icon size slightly on mobile */
                height: 20px;
            }
        }

        .content .lower {
            font-weight: 200;
        }

    </style>
</head>
<body>

    <div class="container">
        <div class="content">
            <!-- Message Image -->
            <div class="message-image">
                <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727129325/Frame_33_qnxf0b.png" alt="Message Image">
            </div>

            <!-- Centered h1-like text -->
            <span>We're Cooking</span>

            <p>Thanks for Joining the waitlist! We're excited to have you onboard as we prepare to launch the next logistics unicorn. As a member of the waitlist, you'll be among the first to experience the future of delivery.</p>
            <p>We'll keep you updated on our progress every Friday and grant you early access once we <s>hit the streets</s> go live.</p>
            <p>Thanks again for your support! If you'd love to contribute, here's a quick 60s survey.</p>
            <span class="lower">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfT69uhrTbxMQO1nRgR-yBQ2aUXxfDqJUbFHib35GDSTgp6Gw/viewform?usp=sf_link">
                    <button class="btn">Take Survey</button>
                </a>
                <p>Best regards,<br>Uptions Errand Boy.</p>
                <p>Contact us: useuptions@gmail.com</p>

                <!-- Social media links -->
                <div class="social-media-container">
                    <p>Follow our social-media:</p>
                    <div class="social-icons">
                        <a href="https://x.com/useuptions" target="_blank" aria-label="Twitter">
                            <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727180738/Uptions_Group_lhzn4n.png" alt="Twitter">
                        </a>
                        <a href="https://www.linkedin.com/company/uptions/" target="_blank" aria-label="LinkedIn">
                            <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727180738/Uptions_Vector_mr3yf7.png" alt="LinkedIn">
                        </a>
                        <a href="https://www.instagram.com/useuptions" target="_blank" aria-label="Instagram">
                            <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727180738/Uptions_Vector_1_faowco.png" alt="Instagram">
                        </a>
                    </div>
                </div>
            </span>
        </div>

        <!-- Footer -->
        <div class="footer">
            <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727129326/Frame_32_royuat.png" alt="Footer Image">
        </div>
    </div>

</body>
</html>`;
}
