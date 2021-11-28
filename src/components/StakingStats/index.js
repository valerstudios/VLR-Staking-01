import * as Style from './style.js';
import { Card, CardContent } from '@mui/material';
import * as Constant from '../../constants.js' 
import { eVlr1Address, eVlrStakerAddress, erc20ABi, evlrStakerAbi } from '../../smartContracts/contractAbis.js';
import { Contract, ethers } from 'ethers';

export default function StakingStats() {

    return (
        <Style.MainArea>
            <Card>
                <CardContent>
                    {Constant.tokenSymbol} balance:<br/>
                    Reward Ownership %<br/> 
                </CardContent>
            </Card>
        </Style.MainArea>

    )
}
