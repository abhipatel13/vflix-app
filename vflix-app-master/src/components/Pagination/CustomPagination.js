import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import './CustomPagination.css';
// import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CustomPagination = ({setPage,numofPages}) => {

    const handleChange = async(page) =>{
        try{
        await setPage(page);
        window.scroll(0,0);
        }
        catch(e){
            console.log(e);
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0971f1',
                darker: '#053e85',
              },
        }
      });

    const PaginationStyle = {
        // backgroundColor : "#39445a",
        display:"flex",
        justifyContent:"center",
        padding:"30px",
        // color:"white"
    };

    return(
        <div>
        <ThemeProvider theme={theme}>
         <Pagination stlye={PaginationStyle} color="primary"  count={numofPages>100?100:numofPages} onChange={(e)=>handleChange(e.target.textContent)}/>
         </ThemeProvider>
        </div>
);

};

export default CustomPagination;