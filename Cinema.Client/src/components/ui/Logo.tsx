import logoUrl from '../../assets/logo.svg';

interface Props{
    size?: "extraSmall"|"small"|"regular"|"large";
}

    const dimensions = {
        extraSmall: { width: 40, height: 15 },
        small: { width: 60, height: 22 },
        regular: { width: 130, height: 49 },
        large:{ width: 195, height: 74 },
        extralarge:{ width: 260, height: 98 }
    };

const Logo: React.FC<Props> = ({size="regular"})=>{
    const {width,height} = dimensions[size]
    return(
        <img
            src={logoUrl}
            alt="cinema logo"
            width={width}
            height={height}
            style={{
                width: 'clamp(40px, 15vw, 120px)',
                height: 'auto'
            }}
            />
    )
}

export default Logo;