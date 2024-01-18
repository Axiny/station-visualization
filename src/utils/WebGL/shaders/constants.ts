const constants: string = /* glsl */`

#define PI                 3.141592653589793
#define HALF_PI            1.5707963267948966                   /* HALF_PI = PI / 2*/
#define TWO_PI             6.283185307179586                    /* TWO_PI = PI * 2*/
#define EPSLN              1e-10
#define FORTPI             0.78539816339744833
#define R2D                57.29577951308232088
#define D2R                0.01745329251994329577
#define SEC_TO_RAD         4.84813681109535993589914102357e-6	/* SEC_TO_RAD = Pi / 180 / 3600 */
#define MAX_ITER           20
#define COS_67P5           0.38268343236508977	                /* cosine of 67.5 degrees */
#define AD_C               1.0026000	                        /* Toms region 1 constant */
#define TITLE_SIZE         512.0                                /* map size http://www.cnblogs.com/beniao/archive/2010/04/18/1714544.html*/
#define DEGREES_TO_RADIANS 0.0174532925199433                   /* DEGREES_TO_RADIANS = PI / 180 */
#define E                  0.0818191908375553                   /* */

`;

export default constants;