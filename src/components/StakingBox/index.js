import TextField from '@mui/material/TextField';
import * as Style from './style.js';

export default function StakingBox() {

    return(
        <Style.StakingArea>
            <Style.StakerInput/>
            <Style.StakerButton>Stake</Style.StakerButton>
            <Style.StakerButton>UnStake</Style.StakerButton>
        </Style.StakingArea>

    )
}
