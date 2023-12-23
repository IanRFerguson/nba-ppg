import * as NbaIcons from 'react-nba-logos';


export function TeamLogo(team) {
    switch (team) {
        case 'MIA':
            return <NbaIcons.MIA />
        case 'LAL':
            return <NbaIcons.LAL />
        case 'BOS':
            return <NbaIcons.BOS />
        case 'LAC':
            return <NbaIcons.LAC />
        case 'BKN':
            return <NbaIcons.BKN />
        case 'CLT':
            return <NbaIcons.CHA />
        case 'CHI':
            return <NbaIcons.CHI />
        case 'ATL':
            return <NbaIcons.ATL />
        case 'PHX':
            return <NbaIcons.PHX />
        case 'DAL':
            return <NbaIcons.DAL />
        case 'DEN':
            return <NbaIcons.DEN />
        case 'DET':
            return <NbaIcons.DET />
        case 'GSW':
            return <NbaIcons.GSW />
        case 'HOU':
            return <NbaIcons.HOU />
        case 'IND':
            return <NbaIcons.IND />
        case 'MEM':
            return <NbaIcons.MEM />
        case 'MIL':
            return <NbaIcons.MIL />
        case 'MIN':
            return <NbaIcons.MIN />
        case 'NOP':
            return <NbaIcons.NOP />
        case 'NYK':
            return <NbaIcons.NYK />
        case 'OKC':
            return <NbaIcons.OKC />
        case 'ORL':
            return <NbaIcons.ORL />
        case 'PHI':
            return <NbaIcons.PHI />
        case 'POR':
            return <NbaIcons.POR />
        case 'SAC':
            return <NbaIcons.SAC />
        case 'SAS':
            return <NbaIcons.SAS />
        case 'TOR':
            return <NbaIcons.TOR />
        case 'UTA':
            return <NbaIcons.UTA />
        case 'CLE':
            return <NbaIcons.CLE />
        case 'WAS':
            return <NbaIcons.WAS />
        case 'CHA':
            return <NbaIcons.CHA />
        default:
            return null
    }
}