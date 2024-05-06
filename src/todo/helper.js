exports.queryToDB = (queryParam, user_id) => {
    const query = {user_id, status: 'active'};

    return query
}