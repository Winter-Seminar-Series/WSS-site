import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

function NetworkCard({ id, image, name, lastName, position, association }) {
  return (
    <Card
      sx={{ width: '273px', boxShadow: 'none', display: 'flex', gap: '10px' }}>
      <CardMedia
        component="img"
        image={image}
        sx={{ width: 112, height: 112, borderRadius: '0.75rem' }}
      />
      <CardContent
        sx={[
          {
            padding: '0.69rem 0',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
          { '&:last-child': { paddingBottom: '0.94rem' } },
        ]}>
        <Typography
          sx={{
            borderBottom: '1.72px solid var(--green-mid)',
            fontSize: '0.97rem',
            fontWeight: '700',
          }}>
          {name} {lastName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.44rem' }}>
          <Typography sx={{ fontSize: '0.77rem' }}>{position}</Typography>
          <Typography sx={{ fontSize: '0.77rem' }}>at {association}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default NetworkCard;
