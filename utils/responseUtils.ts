export function createUserResponse(statusMessage: string, userId: number) {
  return { statusMessage, userId, statusCode: 201 };
}
