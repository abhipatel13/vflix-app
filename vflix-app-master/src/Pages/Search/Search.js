import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
// import createTheme from "@mui/material/styles";
import './Search.css';
import { Tabs, Tab } from "@mui/material";
// import Tab from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import { createMuiTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
// import { width } from "@mui/system";



const Search = () => {
    const [type, setType] = useState(1);
    const [page, setPage] = useState();
    const [searchText, setSearchText] = useState();
    const [content, setContent] = useState();
    const [numofPages, setNumOfPages] = useState();

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}`);
        await setContent(data.results);
        await setNumOfPages(data.total_pages);
        // axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}`).then((data)=>{
        //     setContent(data.results);
        // })
    };
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page])
    return (
        <div>

            <span className='pageTitle'>Search</span>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
                <TextField
                    color="primary"
                    label="Search"
                    variant="filled" 
                    onChange={(e) => setSearchText(e.target.value)}
                    />
                <Button variant="contained"
                    style={{ marginLeft: 10 }} onClick={fetchSearch}>
                    <SearchIcon />
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
            <Tabs value={type} indicatorColor='primary' textColor='white'
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}>
                <Tab style={{ width: "50%" }} label="Search Movie" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />

            </Tabs>
            </div>
         
            <div className="trending">{

                content && content.map((c) => (
                    <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={type ? "tv" : "movie"}
                    vote_average={c.vote_average}
                />))}
                {searchText && !numofPages &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numofPages > 1 && (
                <CustomPagination setPage={setPage} numofPages={numofPages} />)}
        </div>
    )
}

export default Search;