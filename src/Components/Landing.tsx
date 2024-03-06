import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import React from 'react';

interface Istate {
    users: {
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string
    }[]
}

const Landing = () => {
    const [users, setUsers] = React.useState<Istate['users']>([{
        id: 1,
        email: "example@gmail.com",
        first_name: "John",
        last_name: "Doe",
        avatar: "https://avatars.githubusercontent.com/u/6025347?v=4"
    }]);

    async function getData() {
        let response = await fetch("https://reqres.in/api/users");
        let res = await response.json();
        console.log(res.data)
        setUsers(res.data);
    }

    React.useEffect(() => {
        getData();
    }, []);

    const deleteHandler = async (id: number) => {
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) alert(response.status);
        else {
            setUsers((prev) => prev.filter((i) => i.id !== id));
            alert('userDeleted SuccessFull!')
        }




    }


    return (
        <Box sx={styles.root} >
            <Box component={'h1'}>Hello ReqRes users!</Box>
            <Grid container spacing={2} sx={styles.gridContainer}>
                {users?.map((user) => (
                    <Grid key={user.id} item xs={12} sm={6} md={4} lg={3} >
                        <Box sx={styles.Grid_Grid_box}>
                            <Typography sx={{ fontWeight: 900 }}>{user.first_name}</Typography>
                            <Typography>{user.email}</Typography>
                            <Box component={'img'} sx={styles.Box_img} src={user.avatar} onClick={() => deleteHandler(user.id)} />
                        </Box>
                    </Grid>
                ))}

            </Grid>
        </Box >
    )
}

export default Landing

const styles = {
    root: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'column',
    },
    gridContainer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    Grid_Grid_box: { display: 'flex', gap: 1, flexDirection: 'column', },
    Box_img: { width: "120px", height: "120px", alignSelf: 'center' }
}