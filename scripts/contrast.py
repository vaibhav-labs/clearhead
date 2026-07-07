import sys
def lum(h):
    h=h.lstrip('#')
    if len(h)==3: h=''.join(c*2 for c in h)
    r,g,b=(int(h[i:i+2],16)/255 for i in (0,2,4))
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def ratio(a,b):
    la,lb=sorted((lum(a),lum(b)),reverse=True)
    return (la+0.05)/(lb+0.05)
if __name__=='__main__':
    print(f"{ratio(sys.argv[1],sys.argv[2]):.2f}")
