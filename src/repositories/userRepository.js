export function create(userData) {
    console.log('Creating user:', userData)
}

const userRepository = {
    create,
};

export default userRepository;
