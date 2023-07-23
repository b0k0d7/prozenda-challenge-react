import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const TopMenu = () => {

    return (
        <AppBar position="static" sx={{
            background: '#171427',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'star_jedi',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'yellow',
                            textDecoration: 'none',
                        }}
                    >
                        Star Wars Character Search
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Star Wars Character Search
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default TopMenu;