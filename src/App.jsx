
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Work from "./Work";
import Studies from "./Studies";

function App() {

    

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/work" element={<Work />}></Route>
                <Route path="/studies" element={<Studies />}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App;
