export const PROJECT_QUERY = `
slug
title
description
content {
    json
    links {
        assets {
            block {
                sys {
                    id
                }
                url
                description
            }
        }
    }
}
`;

export const PROJECTS_QUERY = ``;
