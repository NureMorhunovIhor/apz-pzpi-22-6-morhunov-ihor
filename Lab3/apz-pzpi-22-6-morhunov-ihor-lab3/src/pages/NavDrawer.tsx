import ListItemButton from "@mui/material/ListItemButton";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {useNavigate} from "react-router";

const navItems = [
    {name: "Cars", url: "/cars", role: "client"},
    {name: "Cars for admins", url: "/cars-admin", role: "administrator"},
    {name: "Policies", url: "/policies", role: "client"},
    {name: "Car types", url: "/car-types", role: "business_logic_admin"},
    {name: "Rules", url: "/rules", role: "business_logic_admin"},
    {name: "Users for admins", url: "/users", role: "global_admin"},
    {name: "Sensors", url: "/sensors", role: "client"},
    {name: "Maintenance", url: "/maintenance", role: "client"},
    {name: "Incidents", url: "/incidents", role: "client"},
    {name: "Policies for admins", url: "/policies-admin", role: "administrator"},
    {name: "Measurements", url: "/measurements", role: "client"},
    {name: "Payments", url: "/payments", role: "client"},
    {name: "Payments for admins", url: "/payments-admin", role: "administrator"},
    {name: "Backup/restore", url: "/backup", role: "settings_admin"},
]

function NavDrawer() {
    const role = localStorage.getItem('role');
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Divider />
            <List>
                {navItems.map(item => (
                    <>
                        {(role || "") === item.role && (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton sx={{textAlign: 'center'}}>
                                    <ListItemText primary={item.name} onClick={() => navigate(item.url)}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                    </>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Apz
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box component="nav" sx={{width: {sm: 200}, flexShrink: {sm: 0}}}>
                <Drawer
                    container={document.body}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true,}}
                    sx={{'& .MuiDrawer-paper': {boxSizing: 'border-box', width: 200}}}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

export default NavDrawer;