import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image'

const styles = {
    texting : {
        textAlign: 'center',
        marginTop: '50px'
    },
    image: {
        display: 'block',
        margin: 'auto',
        maxWidth: '100%', // Ensure image does not exceed container width
        maxHeight: '100%', // Ensure image does not exceed container height
    },

}

function Home() {
    return (
        <div>
            <h1 style={styles.texting}>In construction by SebasOnRails</h1>
            <Image
              src="/dog.jpg"
              width={500}
              height={500}
              alt="Picture of the author's dog"
              style={styles.image}
            />
            <Analytics />
        </div>
    );
}


export default Home;

