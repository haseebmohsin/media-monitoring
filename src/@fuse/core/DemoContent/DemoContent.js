import { memo } from 'react';

function DemoContent() {
  return (
    <div>
      <img
        src="assets/images/demo-content/landing-image.jpg"
        alt="beach"
        style={{
          // maxWidth: '640px',
          width: '100%',
          height: '300px',
        }}
        className="rounded-6"
      />

      <h1 className="py-16 font-semibold">Forbmax Trakk Applications</h1>

      <p>
        Introducing our cutting-edge web application - your all-in-one solution for seamless social
        media engagement, personalized news tracking, and innovative face recognition technology.
        Our platform revolutionizes the way you connect with your social circles, stay informed
        about trending news, and explore the digital landscape.
      </p>
      <br />
      <p>
        With our advanced face recognition capabilities, you can effortlessly tag and identify
        friends in your photos, creating unforgettable memories. Dive into the world of social
        scrapping, where you can easily curate and organize content from various platforms, ensuring
        you never miss a beat.
      </p>
      <br />
      <p>
        Stay ahead of the curve with our mainstream news media tracker, delivering real-time updates
        from reliable sources right to your fingertips. Our platform empowers you to stay informed,
        engaged, and socially active, all within one intuitive interface.
      </p>
      <br />
      <p>
        Join us in redefining the digital experience. Elevate your social media presence, stay
        connected, and stay informed with our all-encompassing web application. Welcome to the
        future of online engagement.
      </p>
    </div>
  );
}

export default memo(DemoContent);
