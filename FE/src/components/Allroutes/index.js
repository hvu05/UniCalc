import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

function Allrouter() {
    const elements = useRoutes(routes)

    return (
        <>
            {elements}
        </>
    )
}
export default Allrouter