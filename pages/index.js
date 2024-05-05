import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image'
import Head from "next/head";

const styles = {
    container: {
        textAlign: 'center',

    },
    texting : {
        textAlign: 'center',
        marginTop: '50px'
    },
    image: {
        display: 'block',
        margin: 'auto',
        marginBottom: '10px',
        maxWidth: '90%', // Ensure image does not exceed container width
        maxHeight: '90%', // Ensure image does not exceed container height
        borderRadius: '10px',
    },
    link: {
        display: 'inline-block',
        marginTop: '20px',
        // margin: 'auto',
        textDecoreation: 'none',
        color: 'grey',
        fontSize: '19px'
    }
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
            <div style={styles.container}>
                <h1 style={styles.texting}>Under construction by SebasOnRails</h1>
                <Image
                    src="/dog.jpg"
                    width={300}
                    height={300}
                    alt="Picture of the author's dog"
                    style={styles.image}
                />
                <h1 style={styles.texting}>By the way, this is my dog smiling</h1>
                <h1 style={styles.texting}>Ajude o Rio Grande do Sul, se possível.</h1>
                <Image
                    src="/RS.png"
                    width={500}
                    height={300}
                    alt="Picture of the author's dog"
                    style={styles.image}
                    href
                />
                <a style={styles.link} href="https://www.vakinha.com.br/4712837">vakinha para ajudar o Rio Grande do Sul</a>
                <Analytics />
            </div>
        </>
    );
}

export default Home;

