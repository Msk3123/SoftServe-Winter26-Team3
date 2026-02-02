import logoUrl from '../../assets/logo.svg';

interface LogoProps{
    size?: "extraSmall"|"small"|"regular"|"large";
    sizeAuto?:boolean;
}

    const dimensions = {
        extraSmall: { width: 40, height: 15 },
        small: { width: 60, height: 22 },
        regular: { width: 150, height: 54 },
        large:{ width: 195, height: 74 },
        extralarge:{ width: 260, height: 98 }
    };

const Logo = ({size="regular",sizeAuto=true}:LogoProps)=>{
    const {width,height} = dimensions[size]
    return(
        <img
            src={logoUrl}
            alt="cinema logo"
            width={width}
            height={height}
            style={sizeAuto?{
                width: 'clamp(40px, 15vw, 120px)',
                height: 'auto'
            }:{}}
            />
    )
}

export default Logo;