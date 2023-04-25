import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style/styles.css";
import "../style/loader.css";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const baseURL = host + "authors";
function Home() {
  const [posts, setPosts] = useState([]);
  const [postslength, setPostsLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const url =
      searchQuery === "" ? baseURL : `${baseURL}/author/${searchQuery}`;

    // if (searchQuery === "") {
    //   setIsLoading(true);
    //   check = 1;
    // }else if(check == 1){
    //   setIsLoading(false);
    // }

    setIsLoading(false);
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
        setPostsLength(response.data.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [searchQuery]);

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingTop: "3rem" }}
      style={{ marginTop: "65px" }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="loader">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>
          <Typography variant="h4" sx={{ mb: 2 }} className="color-blue pb-3">
            Search Researcher
          </Typography>
          <TextField
            variant="outlined"
            label="Enter researcher name"
            fullWidth
            value={searchQuery}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {postslength === 0 ? (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "47vh",
            }}>
              <p className="font color-blue not-found ubutu">Not Found Researcher</p>
            </div>
          ) : (
            <>
              <Divider sx={{ my: 4 }} />
              <Grid container spacing={4}>
                {posts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={3}>
                    <Link
                      to={`/author-detail?id=${post._id}`}
                      className="no-underline"
                    >
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            pt: "56.25%",
                            padding: "0",
                            width: "100%",
                            height: "290px",
                          }}
                          image={post.image}
                          alt={post.author_name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography>
                            <h5 className="ubutu color-blue">
                              {post.author_name}
                            </h5>
                          </Typography>
                          <Typography className="ubutu gray">
                            {post.department}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default Home;
