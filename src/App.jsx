import { Alert, Button, Container, MenuItem, Paper, Select, Snackbar, TextField, Typography, colors } from '@mui/material'
import './App.css'
import { useState } from 'react';

function App() {
  const [pais, setPais] = useState("AR");
  const [ciudad, setCiudad] = useState("");
  const [climaActual, setClimaActual] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickBuscar = () => {
    const appId = '6564847ca79d1ca450cc4291d8e8b947';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    fetch(url)
        .then( respuesta => respuesta.json())
        .then(resultado => {
            if(resultado.cod === '404'){
                mostrarError(`Ciudad no encontrada o no pertenece a ${pais}`);
                return;
            }
    mostrarClima(resultado);
    });
  }


  const handleChangeSelect = (nuevoPais) => {
    setPais(nuevoPais);
  }

  const handleChangeCiudad = (nuevaCiudad) => {
    setCiudad(nuevaCiudad);
  }

  const mostrarClima = (clima) => {
    if(clima.main){
      const {temp_max, temp_min, temp} = clima.main;
      const tempAc = temp - 273.15;
      const max = temp_max- 273.15;
      const min = temp_min- 273.15;
      const climaNuevo = {max, min, tempAc}
      setClimaActual(climaNuevo);
    }
  }

  const mostrarError = (mensaje) => {
      setMessage(mensaje);
      setShowAlert(true);
  }

  const handleCerrar = () =>{
    setShowAlert(false);
  }

  return (
    <>
        <Paper elevation={5} sx={{padding: "10px"}}>
          <TextField 
          value={ciudad}
            label="Ciudad"
            name='ciudad'
            onChange={(e) => handleChangeCiudad(e.target.value)}
            sx={{margin: "10px"}}
          />
          <Select value={pais} onChange={(e) => handleChangeSelect(e.target.value)} sx={{margin: "10px"}}>
          <MenuItem value="AR">Argentina</MenuItem>
          <MenuItem value="CO">Colombia</MenuItem>
          <MenuItem value="CR">Costa Rica</MenuItem>
          <MenuItem value="ES">España</MenuItem>
          <MenuItem value="US">Estados Unidos</MenuItem>
          <MenuItem value="MX">México</MenuItem>
          <MenuItem value="PE">Perú</MenuItem>
          </Select>
          <Button 
            variant='outlined' onClick={(e) => handleClickBuscar()}
            sx={{margin: "10px"}}
          >Buscar Clima
          </Button>
        </Paper>
        <Paper elevation={5} sx={{marginTop: "30px"}}>
          <Typography>Clima</Typography>
            <Container>
              <h2>Actual: {climaActual.tempAc}</h2>
              <h3>Max: {climaActual.max}</h3>
              <h3>Min: {climaActual.min}</h3>
            </Container>
        </Paper>
        <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleCerrar}>
          <Alert onClose={handleCerrar} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
    </>
  )
}

export default App
