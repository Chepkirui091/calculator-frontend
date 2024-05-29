"use client"

import { useState, useEffect } from 'react';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Box, Button, Grid, TextField, Typography,ThemeProvider } from '@mui/material';
import { CreateTheme} from "@/theme/page";

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [systemTheme, setSystemTheme] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    useEffect(() => {
        const systemThemeListener = (event) => {
            setSystemTheme(event.matches ? 'dark' : 'light');
        };
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', systemThemeListener);

        return () => {
            mediaQuery.removeEventListener('change', systemThemeListener);
        };
    }, []);

    const handleThemeChange = () => {
        setSystemTheme(systemTheme === 'dark' ? 'light' : 'dark');
    };

    const handleClick = (value) => {
        if (value === 'C') {
            handleClear();
        } else if (value === '=') {
            handleCalculate();
        } else if (value === '00') {
            setInput(input + '00');
        } else if (value === 'Backspace') {
            handleBackspace();
        } else {
            setInput(input + value);
        }
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };

    const handleCalculate = async () => {
        try {
            const response = await fetch(`http://localhost:3001/calculate?expression=${encodeURIComponent(input)}`);
            const data = await response.json();
            if (response.ok) {
                setResult(data.result);
            } else {
                setResult('Error');
            }
        } catch (error) {
            console.error('Error:', error);
            setResult('Error');
        }
    };

    const theme = CreateTheme({ mode: systemTheme, direction: 'ltr' });


    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                color="text.primary"
            >
                <Typography variant="h3" gutterBottom>
                    Calculator
                </Typography>
                <Box width="300px" mb={3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={input}
                        readOnly
                        sx={{ mb: 1 }}
                    />
                    <Typography variant="h5" textAlign="right">
                        {result}
                    </Typography>
                </Box>
                <Grid container spacing={1} justifyContent="center" width="300px">
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={handleClear}>
                            C
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={() => handleClick('%')}>
                            <PercentOutlinedIcon fontSize="small" />
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={handleBackspace}>
                            <BackspaceOutlinedIcon fontSize="small" />
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={() => handleClick('/')}>
                            /
                        </Button>
                    </Grid>
                    {['7', '8', '9', '*'].map((value) => (
                        <Grid item xs={3} key={value}>
                            <Button variant="contained" onClick={() => handleClick(value)}>
                                {value}
                            </Button>
                        </Grid>
                    ))}
                    {['4', '5', '6', '-'].map((value) => (
                        <Grid item xs={3} key={value}>
                            <Button variant="contained" onClick={() => handleClick(value)}>
                                {value}
                            </Button>
                        </Grid>
                    ))}
                    {['1', '2', '3', '+'].map((value) => (
                        <Grid item xs={3} key={value}>
                            <Button variant="contained" onClick={() => handleClick(value)}>
                                {value}
                            </Button>
                        </Grid>
                    ))}
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={() => handleClick('00')}>
                            00
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={() => handleClick('0')}>
                            0
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={() => handleClick('.')}>
                            .
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={handleCalculate}>
                            =
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            </ThemeProvider>
            );
            }