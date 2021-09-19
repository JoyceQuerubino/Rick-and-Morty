import 'styled-components'; 
import theme from './theme';

//acessar o modulo do styled-components
declare module 'styled-components' {
    //criando um tipo chamado 'ThemeType', e estou dizendo que ele é igual a tipo theme
    type ThemeType = typeof theme

    //pegando a interface DefaultTheme e acresccentando o nosso novo tema.
    export interface DefaultTheme extends ThemeType {}
}