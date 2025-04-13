import { createUser } from '~/services/userService';
import { createUserResponse } from '~/utils/responseUtils';

export default defineEventHandler(async event => {
  if (event.node.req.method !== 'POST')
    throw createError({ statusMessage: 'Method not allowed', statusCode: 405 });

  const { userName, password } = await readBody(event);

  if (!userName || !password) {
    throw createError({ statusMessage: 'Missing required fields', statusCode: 400 });
  }

  try {
    const user = await createUser(userName, password);
    const response = createUserResponse('Customer created', user.id);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw createError({ statusMessage: error.message, statusCode: 400 });
    }
    throw createError({ statusMessage: 'Failed to create user', statusCode: 400 });
  }
});
