import type { ActorShort } from "../../../../types/actor.types";
import styles from "./ActorOption.module.css"

const ActorOption = ({item}:{item:ActorShort})=>{
    return (<div>
        {item.firstName} {item.lastName}
    </div>)
}

export default ActorOption;