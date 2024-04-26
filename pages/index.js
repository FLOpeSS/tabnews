import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image'
import Head from "next/head";

const styles = {
    texting : {
        textAlign: 'center',
        marginTop: '50px'
    },
    image: {
        display: 'block',
        margin: 'auto',
        maxWidth: '90%', // Ensure image does not exceed container width
        maxHeight: '90%', // Ensure image does not exceed container height
    },
}

function Home() {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div>
                <h1 style={styles.texting}>Under construction by SebasOnRails</h1>
                <Image
                    src="/dog.jpg"
                    width={500}
                    height={500}
                    alt="Picture of the author's dog"
                    style={styles.image}
                />
                <div className="line" style={styles.line}></div>
                <h1 style={styles.texting}>By the way, this is my dog smiling</h1>
                <Analytics />
            </div>
        </>
    );
}

export default Home;

