import { IJwtService } from "../interfaces/IJwtService";



export class RefreshTokenUseCase {

    constructor(
        private readonly jwtService: IJwtService
    ) {}

    async execute(refreshToken: string) {

        const payload =
            this.jwtService.verifyRefreshToken(refreshToken);

        const newAccessToken =
            this.jwtService.generateAccessToken({
                userId: payload.userId,
                email: payload.email,
                role: payload.role
            });

        return {
            accessToken: newAccessToken
        };
    }
}