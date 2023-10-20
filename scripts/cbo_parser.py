import re, sys
from pprint import pprint

def parse_organizations(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        content = file.read()

    # Split content by organization number
    org_splits = re.split(r'\d+\.', content)

    organizations = []

    region_match = re.search(r'Programs in ([^\n]+)', org_splits[0])
    region = region_match.group(1) if region_match else None

    for org in org_splits[1:]:  # Skip the first split as it's the header
        org = org.strip()

        # Extract name
        name_match = re.match(r'^(.*?)\nLanguages:', org)
        if name_match:
            name = name_match.group(1).strip()
        else:
            continue  # Skip if no match

        # Extract languages
        languages_match = re.search(r'Languages: (([A-Z][a-z\s]*(,[\s\n]+)?)+)', org)
        languages = [x.split('\n')[0].strip() for x in (re.split(r',[\s\n]', languages_match.group(1)) if languages_match else []) if len(x)]

        # Extract address
        address_pattern = re.compile(r'\n(\d+.*?\b(?:New York|NY)\b.*)\n')
        address_match = address_pattern.findall(org)
        address = address_match[0].strip() if address_match else None
        zip_code = address.split(' ')[-1] if address else None

        # Extract phone
        phone_match = re.search(r'Phone: (.*?)\n', org)
        phone = phone_match.group(1).strip() if phone_match else None

        # Extract URL
        url_match = re.search(r'https?://[^\s]+|www\d?\.[^\s]+', org)
        url = url_match.group(0) if url_match else None

        # Extract description
        desc_match = re.search(r'(https?://[^\s]+|www\.[^\s]+)\n(.*?)$', org, re.DOTALL)
        description = desc_match.group(2).strip() if desc_match else None

        organizations.append({
            "name": name,
            "languages": languages,
            "address": address,
            "borough": region.title() if region else determine_borough(zip_code) if zip_code else None,
            "phone": phone,
            "url": url,
            "description": description.replace('\n', ' ') if description else None
        })

    return organizations

def determine_borough(zip_code):
    zip_code = int(str(zip_code)[:3]) 
    if 100 <= zip_code <= 102:
        return "Manhattan"
    elif zip_code == 104:
        return "The Bronx"
    elif zip_code == 112:
        return "Brooklyn"
    elif zip_code in [110, 111] or 113 <= zip_code <= 116:
        return "Queens"
    elif zip_code == 103:
        return "Staten Island"
    else:
        return None  # If the ZIP code doesn't match any NYC borough

if __name__ == "__main__":
    if len(sys.argv) == 1:
        print('Please provide a file to parse.')
    else:
        filename = sys.argv[1]
        orgs = parse_organizations(filename)
        num_spaces = 2

        print('export default [')
        for org in orgs:
            print(' ' * num_spaces + '{')
            for k, v in org.items():
                if isinstance(v, str):
                    v = '"{}"'.format(v)
                elif v is None:
                    v = 'null'
                print(' ' * num_spaces * 2 + '{}: {},'.format(k, v))
            print('  },')
        print('];')