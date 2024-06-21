import React from 'react';
import { Typography, Box, Grid, Avatar, Link, IconButton, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useMediaQuery } from '@mui/material';

// Import your banner image
import competitionBanner from '/datathon.png';

const teamMembers = [
  {
    name: 'Thirumurugan A',
    image: '/thirumurugan.jpg',
    quote: 'Stay alert, stay alive. Road safety is not just about regulations, but a way of life that requires vigilance and responsibility. My journey into traffic safety began with a close call that made me realize the importance of being aware and cautious on the road.',
    linkedin: 'https://www.linkedin.com/in/thirumurugan12/',
    github: 'https://github.com/Thirumurugan-12',
    instagram: 'https://www.instagram.com/blu.esense/'
  },
  {
    name: 'Venkatesan M',
    image: '/venkatesan.jpg',
    quote: 'Safety is not just a slogan, it’s a way of life. Our goal is to create a safer environment through innovative traffic analysis. After witnessing numerous accidents in my hometown, I was inspired to contribute to making our roads safer for everyone.',
    linkedin: 'https://www.linkedin.com/in/venkatesan-m-bba502236/',
    github: 'https://github.com/Venkatesan-M',
    instagram: 'https://www.instagram.com/venkatesan.ipynb/'
  },
  {
    name: 'Rakshana V',
    image: '/rakshana.jpg',
    quote: 'Better late than never. Drive safe. Alongside my twin sister, Raveena, I am committed to making our roads safer. Together, we believe that every small step towards road safety can lead to big changes.',
    linkedin: 'https://www.linkedin.com/in/rakshana-v-1a5210288/',
    github: 'https://github.com/Raksh-iscool',
    instagram: 'https://www.instagram.com/raksh__h/'
  },
  {
    name: 'Raveena V',
    image: '/raveena.jpg',
    quote: 'Road safety is a state of mind, accident is an absence of mind. As twins, Rakshana and I have always shared a passion for making a positive impact. Our combined efforts in this project aim to leverage data-driven insights to prevent accidents and save lives.',
    linkedin: 'https://www.linkedin.com/in/raveena-v/',
    github: 'https://github.com/raveena31',
    instagram: 'https://www.instagram.com/raveena__31/'
  }
];

const About = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container sx={{ maxWidth: '75%' }}>
      <Typography variant="h2" color="primary" sx={{ mb: 4, textAlign: 'center' }}>
        About Us
      </Typography>
      {!isMobile &&       
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <img src={competitionBanner} alt="Competition Banner" style={{ maxWidth: '100%', height: 'auto', borderRadius : '18px' }} />
      </Box>}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Welcome to our project, developed in collaboration with the Karnataka State Police, aimed at enhancing road safety through predictive analytics and thorough traffic analysis. Our mission is to leverage data to predict traffic conditions, identify potential hazards, and ultimately reduce the number of traffic accidents. By providing actionable insights, we strive to make the roads of Karnataka safer for everyone.
      </Typography>
      <Typography variant="h2" color="primary" sx={{ mb: 4, textAlign: 'center' }}>
        Demo Video
      </Typography>
      <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: 4 }}>
        <iframe
          src="https://www.youtube.com/embed/AtkYhija9ks?si=OQbxVl2qob9_uEyT"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        ></iframe>
      </Box>
      {!isMobile &&
      <Typography variant="h2" color="primary" sx={{ mb: 4, textAlign: 'center' }}>
        Contributors
      </Typography>}
      <hr />
      {teamMembers.map((member, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5} order={{ xs: 1, md: index % 2 === 0 ? 1 : 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: '100%', height: 'auto', maxWidth: 300, borderRadius: '10%' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7} order={{ xs: 2, md: index % 2 === 0 ? 2 : 1 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {member.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {member.quote}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link href={member.linkedin} target="_blank" rel="noopener" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton sx={{ fontSize: isMobile ? '1.2rem' : '2rem' }}>
                    <LinkedInIcon fontSize="inherit" />
                  </IconButton>
                </Link>
                <Link href={member.github} target="_blank" rel="noopener" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton sx={{ fontSize: isMobile ? '1.2rem' : '2rem' }}>
                    <GitHubIcon fontSize="inherit" />
                  </IconButton>
                </Link>
                <Link href={member.instagram} target="_blank" rel="noopener" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton sx={{ fontSize: isMobile ? '1.2rem' : '2rem' }}>
                    <InstagramIcon fontSize="inherit" />
                  </IconButton>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <hr className="featurette-divider" />
        </Box>
      ))}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Our application is designed to analyze various factors that contribute to road accidents, such as traffic density, weather conditions, and time of day. By harnessing this information, we aim to provide timely warnings and preventive measures to reduce the likelihood of accidents. This initiative is not just about technology, but about saving lives and making our roads safer for everyone. Together with the Karnataka State Police, we are committed to achieving a significant reduction in traffic incidents and creating a safer environment for all road users.
      </Typography>
    </Container>
  );
};

export default About;
